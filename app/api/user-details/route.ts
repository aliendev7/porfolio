import { NextRequest } from "next/server";
import db from "@/lib/db";
import { ok, created, fail, serverError, parseBody } from "@/lib/api";
import { userDetailSchema } from "@/lib/validators";

export async function GET() {
    try {
        // Singleton: returns the single UserDetail row, or null if none exists.
        // The frontend (`getHomeDataV2`) relies on receiving the object-or-null.
        return ok(await db.userDetail.findFirst());
    } catch (error) {
        return serverError(error, "Failed to fetch user detail");
    }
}

export async function POST(request: NextRequest) {
    try {
        const parsed = await parseBody(request, userDetailSchema);
        if ("response" in parsed) return parsed.response;
        const { data } = parsed;

        const existing = await db.userDetail.findFirst();
        if (existing) return fail(400, "User detail already exists. Use PUT to update.");

        const userDetail = await db.userDetail.create({
            data: {
                welcomeTitle: data.welcomeTitle,
                welcomeNote: data.welcomeNote,
                welcomeDescription: data.welcomeDescription,
                cvFile: data.cvFile ?? null,
                userImage: data.userImage,
            },
        });
        return created(userDetail);
    } catch (error) {
        return serverError(error, "Failed to create user detail");
    }
}

export async function PUT(request: NextRequest) {
    try {
        const parsed = await parseBody(request, userDetailSchema);
        if ("response" in parsed) return parsed.response;
        const { data } = parsed;

        const existing = await db.userDetail.findFirst();
        if (!existing) return fail(404, "User detail not found. Create one first.");

        const userDetail = await db.userDetail.update({
            where: { id: existing.id },
            data: {
                welcomeTitle: data.welcomeTitle,
                welcomeNote: data.welcomeNote,
                welcomeDescription: data.welcomeDescription,
                cvFile: data.cvFile ?? null,
                userImage: data.userImage,
            },
        });
        return ok(userDetail);
    } catch (error) {
        return serverError(error, "Failed to update user detail");
    }
}
