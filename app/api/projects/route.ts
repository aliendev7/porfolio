import { NextRequest } from "next/server";
import db from "@/lib/db";
import { generateSlug } from "@/lib/slug-util";
import { ok, created, fail, serverError, parseBody } from "@/lib/api";
import { projectSchema, toList } from "@/lib/validators";

export async function GET(request: NextRequest) {
    try {
        const projects = await db.project.findMany({
            include: { tools: true },
            orderBy: { publishedAt: "desc" },
        });
        return ok(projects);
    } catch (error) {
        return serverError(error, "Failed to fetch projects");
    }
}

export async function POST(request: NextRequest) {
    try {
        const parsed = await parseBody(request, projectSchema);
        if ("response" in parsed) return parsed.response;
        const { data } = parsed;

        const slug = generateSlug(data.title);
        const existing = await db.project.findUnique({ where: { slug } });
        if (existing) return fail(409, "Project with this title already exists");

        const newProject = await db.project.create({
            data: {
                title: data.title,
                slug,
                description: data.description,
                content: data.content,
                coverImage: data.coverImage,
                cover: data.coverImage, // legacy mirror (read by public frontend)
                githubUrl: data.githubUrl ?? null,
                liveUrl: data.liveUrl ?? null,
                link: data.liveUrl ?? data.githubUrl ?? "", // legacy mirror
                about: data.description, // legacy mirror
                category: data.category,
                technologies: toList(data.technologies),
                publishedAt: data.publishedAt,
            },
        });
        return created(newProject);
    } catch (error) {
        return serverError(error, "Failed to create project");
    }
}
