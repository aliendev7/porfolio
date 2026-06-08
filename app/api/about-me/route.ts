import db from "@/lib/db";
import { ok, serverError } from "@/lib/api";

export async function GET() {
    try {
        const aboutMe = await db.aboutContent.findMany({ orderBy: { createdAt: "asc" } });
        return ok(aboutMe);
    } catch (error) {
        return serverError(error, "Failed to fetch about content");
    }
}
