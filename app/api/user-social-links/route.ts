import db from "@/lib/db";
import { ok, serverError } from "@/lib/api";

export async function GET() {
    try {
        const links = await db.userSocialLink.findMany();
        return ok(links);
    } catch (error) {
        return serverError(error, "Failed to fetch social links");
    }
}
