import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { generateSlug } from "@/lib/slug-util";

export async function GET() {
  try {
    const educations = await db.education.findMany({
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json(educations);
  } catch (error) {
    console.error("ERROR fetching educations:", error);
    return NextResponse.json({ error, message: 'Failed to fetch educations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { institution, degree, field, startDate, endDate, order } = body;

    if (!institution || !degree || !field || !startDate) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const slug = generateSlug(`${degree}-${institution}`);
    const existing = await db.education.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ message: 'Education with this degree and institution already exists' }, { status: 409 });
    }

    const education = await db.education.create({
      data: {
        institution,
        degree,
        field,
        slug,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        order: order ?? 0,
      },
    });

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error("ERROR creating education:", error);
    return NextResponse.json({ error, message: 'Failed to create education' }, { status: 500 });
  }
}
