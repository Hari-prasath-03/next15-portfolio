import { MultiRecordDb } from "../../lib/jsondb";
import { ProjectType } from "../route";

const db = new MultiRecordDb<ProjectType>("projects");

function slugToTitle(slug: string): string {
  return slug.replace(/-/g, " ").trim();
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  const title = await params;
  const normalisedTitle = slugToTitle(title.title);
  
  const projects = await db.find({
    name: normalisedTitle,
  } as Partial<ProjectType>);

  if (!projects || projects.length === 0) {
    return Response.json({ message: "Project not found" }, { status: 404 });
  }

  return Response.json(projects[0], { status: 200 });
}
