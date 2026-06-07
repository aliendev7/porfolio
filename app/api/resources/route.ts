import { NextRequest } from "next/server";
import db from "@/lib/db";
import { generateSlug } from "@/lib/slug-util";
import { ok, created, fail, serverError, parseBody } from "@/lib/api";
import { resourceSchema, toList } from "@/lib/validators";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get("categoryId");
        const tags = searchParams.get("tags")?.split(",");
        const type = searchParams.get("type");

        const where: any = {};
        if (categoryId) where.categoryId = categoryId;
        if (tags && tags.length > 0) where.tags = { hasEvery: tags };
        if (type) where.type = type;

        const resources = await db.resource.findMany({
            where,
            include: { category: true },
            orderBy: { publishedAt: "desc" },
        });
        return ok(resources);
    } catch (error) {
        return serverError(error, "Failed to fetch resources");
    }
}

export async function POST(request: NextRequest) {
    try {
        const parsed = await parseBody(request, resourceSchema);
        if ("response" in parsed) return parsed.response;
        const { data } = parsed;

        const slug = generateSlug(data.title);
        const existing = await db.resource.findUnique({ where: { slug } });
        if (existing) return fail(409, "Resource with this title already exists");

        const newResource = await db.resource.create({
            data: {
                title: data.title,
                slug,
                description: data.description,
                content: data.content,
                coverImage: data.coverImage,
                link: data.link ?? null,
                type: data.type,
                categoryId: data.categoryId,
                tags: toList(data.tags),
                author: data.author,
                publishedAt: data.publishedAt,
                readTimeMinutes: data.readTimeMinutes ?? undefined,
            },
        });
        return created(newResource);
    } catch (error) {
        return serverError(error, "Failed to create resource");
    }
}
