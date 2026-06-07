import { NextRequest } from "next/server";
import db from "@/lib/db";
import { generateSlug } from "@/lib/slug-util";
import { ok, created, fail, serverError, parseBody } from "@/lib/api";
import { resourceCategorySchema } from "@/lib/validators";

// NOTE: `/api/categories` is a duplicate of `/api/resource-categories` (both
// operate on the `resourceCategory` model). The admin UI uses this path; the
// public frontend uses `/api/resource-categories`. Both are kept behaviorally
// identical until they can be consolidated. See docs/API_INTEGRATION.md.

export async function GET(request: NextRequest) {
    try {
        const categories = await db.resourceCategory.findMany({ orderBy: { name: "asc" } });
        return ok(categories);
    } catch (error) {
        return serverError(error, "Failed to fetch categories");
    }
}

export async function POST(request: NextRequest) {
    try {
        const parsed = await parseBody(request, resourceCategorySchema);
        if ("response" in parsed) return parsed.response;
        const { data } = parsed;

        const slug = generateSlug(data.name);
        const existing = await db.resourceCategory.findUnique({ where: { slug } });
        if (existing) return fail(409, "Category with this name already exists");

        const newCategory = await db.resourceCategory.create({
            data: { name: data.name, slug, description: data.description ?? null },
        });
        return created(newCategory);
    } catch (error) {
        return serverError(error, "Failed to create category");
    }
}
