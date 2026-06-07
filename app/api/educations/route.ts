import { NextRequest } from "next/server";
import db from "@/lib/db";
import { generateSlug } from "@/lib/slug-util";
import { ok, created, fail, serverError, parseBody } from "@/lib/api";
import { educationSchema } from "@/lib/validators";

export async function GET() {
    try {
        const educations = await db.education.findMany({ orderBy: { startDate: "desc" } });
        return ok(educations);
    } catch (error) {
        return serverError(error, "Failed to fetch educations");
    }
}

export async function POST(request: NextRequest) {
    try {
        const parsed = await parseBody(request, educationSchema);
        if ("response" in parsed) return parsed.response;
        const { data } = parsed;

        const slug = generateSlug(`${data.degree}-${data.institution}`);
        const existing = await db.education.findUnique({ where: { slug } });
        if (existing) return fail(409, "Education with this degree and institution already exists");

        const education = await db.education.create({
            data: {
                institution: data.institution,
                degree: data.degree,
                field: data.field,
                slug,
                startDate: data.startDate,
                endDate: data.endDate ?? null,
                order: data.order,
            },
        });
        return created(education);
    } catch (error) {
        return serverError(error, "Failed to create education");
    }
}
