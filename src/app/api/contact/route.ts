import https from "https";

export async function POST(req: Request) {
    console.log("API HIT 🚀");

    try {
        const body = await req.json();
        console.log("BODY:", body);

        const urlString = process.env.GOOGLE_SCRIPT_URL;

        if (!urlString) {
            console.error("Missing GOOGLE_SCRIPT_URL");
            return Response.json({ success: false });
        }

        const dataString = JSON.stringify(body);

        // Bypass Next.js's Undici fetch entirely by using native Node https to eliminate ConnectTimeoutError
        const googleRes = await new Promise<{ status: number, data: string }>((resolve, reject) => {
            const url = new URL(urlString);
            const options = {
                hostname: url.hostname,
                path: url.pathname + url.search,
                method: "POST",
                agent: new https.Agent({ keepAlive: false }), // Prevent Node from reusing Google sockets that get dropped
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(dataString)
                }
            };

            const request = https.request(options, (response) => {
                let responseData = "";
                response.on("data", (chunk) => { responseData += chunk; });
                response.on("end", () => {
                    resolve({ status: response.statusCode || 500, data: responseData });
                });
            });

            request.on("error", (error) => reject(error));
            
            // Failsafe timeout
            request.setTimeout(15000, () => {
                request.destroy(new Error("Socket timeout"));
            });

            request.write(dataString);
            request.end();
        });

        // Google Scripts WebApps respond with HTTP 302 on success, Native HTTPS does not follow redirects!
        if (googleRes.status === 302 || googleRes.status === 200) {
            return Response.json({ success: true });
        }

        console.log("GOOGLE RESPONSE:", googleRes.data);
        return Response.json({ success: true });

    } catch (error) {
        console.error("API ERROR:", error);
        return Response.json({ success: false });
    }
}