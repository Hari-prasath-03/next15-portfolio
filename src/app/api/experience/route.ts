import { ExperienceSchems } from "../types/schemas";
import Experience from "../lib/models/experience.model";
import z from "zod";
import connectToDb from "../lib/db";

export async function GET() {
  await connectToDb();
  const experiences = await Experience.find({});
  return Response.json(experiences.reverse(), { status: 200 });
}

export async function POST(request: Request) {
  const experience = await request.json();
  if (Array.isArray(experience)) {
    const parsed = z.array(ExperienceSchems).safeParse(experience);
    if (!parsed.success) {
      return Response.json(
        { message: "Invalid experience data." },
        { status: 400 }
      );
    }
    await connectToDb();
    await Experience.insertMany(parsed.data);
  } else {
    const parsed = ExperienceSchems.safeParse(experience);

    if (!parsed.success) {
      return Response.json(
        { message: "Invalid experience data." },
        { status: 400 }
      );
    }
    await connectToDb();
    await Experience.create(parsed.data);
  }

  return Response.json(
    { message: "Experience created successfully." },
    { status: 201 }
  );
}
