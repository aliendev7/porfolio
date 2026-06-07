import { NextRequest } from "next/server";
import db from "@/lib/db";
import { generateSlug } from "@/lib/slug-util";
import { ok, created, fail, serverError, parseBody } from "@/lib/api";
import { skillCategorySchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
    try {
        const categories = await db.skillCategory.findMany({
            include: { skills: { orderBy: { order: "asc" } } },
            orderBy: { order: "asc" },
        });
        return ok(categories);
    } catch (error) {
        return serverError(error, "Failed to fetch skill categories");
    }
}

export async function POST(request: NextRequest) {
    try {
        const parsed = await parseBody(request, skillCategorySchema);
        if ("response" in parsed) return parsed.response;
        const { data } = parsed;

        const slug = generateSlug(data.name);
        const existing = await db.skillCategory.findUnique({ where: { slug } });
        if (existing) return fail(409, "Category with this name already exists");

        const newCategory = await db.skillCategory.create({
            data: {
                name: data.name,
                slug,
                description: data.description ?? null,
                icon: data.icon ?? null,
                color: data.color ?? null,
                order: data.order,
            },
        });
        return created(newCategory);
    } catch (error) {
        return serverError(error, "Failed to create skill category");
    }
}
