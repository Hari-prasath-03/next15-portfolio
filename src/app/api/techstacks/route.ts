import z from "zod";
import { TechStackSchema } from "../types/schemas";
import TechStack from "../lib/models/techstack.model";
import connectToDb from "../lib/db";

type TechStackType = z.infer<typeof TechStackSchema>;

export async function GET() {
  await connectToDb();
  const techStacks = (await TechStack.find().lean()) as TechStackType[];
  const tabs = Array.from(new Set(techStacks.map((t) => t.category)));
  return Response.json({ techStacks, tabs }, { status: 200 });
}

export async function POST(request: Request) {
  const techStack = await request.json();

  if (Array.isArray(techStack)) {
    const parsed = z.array(TechStackSchema).safeParse(techStack);

    if (!parsed.success) {
      return Response.json(
        { message: "Invalid tech stack data." },
        { status: 400 }
      );
    }

    await connectToDb();
    await TechStack.insertMany(techStack);
  } else {
    const parsed = TechStackSchema.safeParse(techStack);
    if (!parsed.success) {
      return Response.json(
        { message: "Invalid tech stack data." },
        { status: 400 }
      );
    }

    await connectToDb();
    await TechStack.create(parsed.data);
  }

  return Response.json(
    { message: "Tech stacks created successfully." },
    { status: 201 }
  );
}
