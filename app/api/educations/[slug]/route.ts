import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/db";
import { generateSlug } from "@/lib/slug-util";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const education = await db.education.findUnique({ where: { slug } });

    if (!education) {
      return NextResponse.json({ message: 'Education not found' }, { status: 404 });
    }

    return NextResponse.json(education);
  } catch (error) {
    console.error("ERROR fetching education:", error);
    return NextResponse.json({ error, message: 'Failed to fetch education' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { institution, degree, field, startDate, endDate, order } = body;

    if (!institution || !degree || !field || !startDate) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newSlug = generateSlug(`${degree}-${institution}`);
    if (newSlug !== slug) {
      const existing = await db.education.findUnique({ where: { slug: newSlug } });
      if (existing) {
        return NextResponse.json({ message: 'Education with this degree and institution already exists' }, { status: 409 });
      }
    }

    const education = await db.education.update({
      where: { slug },
      data: {
        institution,
        degree,
        field,
        slug: newSlug,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        order: order ?? 0,
      },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error("ERROR updating education:", error);
    return NextResponse.json({ error, message: 'Failed to update education' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    await db.education.delete({ where: { slug } });
    return NextResponse.json({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error("ERROR deleting education:", error);
    return NextResponse.json({ error, message: 'Failed to delete education' }, { status: 500 });
  }
}
