import z from "zod";
import { ProjectsSchema } from "../types/schemas";
import { MultiRecordDb } from "../lib/jsondb";

export type ProjectType = z.infer<typeof ProjectsSchema>;

const db = new MultiRecordDb<ProjectType>("projects");

export async function GET() {
  const projects = (await db.readAll()) as ProjectType[];
  return Response.json(
    projects.sort((a, b) => (b.id as number) - (a.id as number)),
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const projects = await request.json();
  console.log(projects);
  const parsed = ProjectsSchema.safeParse(projects);

  if (!parsed.success) {
    return Response.json(
      { message: "Invalid experience data." },
      { status: 400 }
    );
  }

  console.log(parsed.data);
  await db.addOne(parsed.data);
  return Response.json(
    { message: "Experience created successfully." },
    { status: 201 }
  );
}
