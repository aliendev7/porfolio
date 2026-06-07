import { NextRequest } from "next/server";
import db from "@/lib/db";
import { generateSlug } from "@/lib/slug-util";
import { ok, created, fail, serverError, parseBody } from "@/lib/api";
import { skillSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
    try {
        const skills = await db.skill.findMany({
            include: { category: true },
            orderBy: { order: "asc" },
        });
        return ok(skills);
    } catch (error) {
        return serverError(error, "Failed to fetch skills");
    }
}

export async function POST(request: NextRequest) {
    try {
        const parsed = await parseBody(request, skillSchema);
        if ("response" in parsed) return parsed.response;
        const { data } = parsed;

        const category = await db.skillCategory.findUnique({ where: { id: data.categoryId } });
        if (!category) return fail(404, "Category not found");

        const slug = generateSlug(data.name);
        const existing = await db.skill.findUnique({ where: { slug } });
        if (existing) return fail(409, "Skill with this name already exists");

        const newSkill = await db.skill.create({
            data: {
                name: data.name,
                slug,
                categoryId: data.categoryId,
                proficiency: data.proficiency,
                order: data.order,
            },
            include: { category: true },
        });
        return created(newSkill);
    } catch (error) {
        return serverError(error, "Failed to create skill");
    }
}
