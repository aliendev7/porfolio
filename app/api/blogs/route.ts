import db from "@/lib/db";
import { ok, serverError } from "@/lib/api";

export async function GET() {
    try {
        const blogs = await db.blog.findMany({ orderBy: { createdAt: "desc" } });
        return ok(blogs);
    } catch (error) {
        return serverError(error, "Failed to fetch blogs");
    }
}
