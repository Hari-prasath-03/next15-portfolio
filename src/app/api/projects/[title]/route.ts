import connectToDb from "../../lib/db";
import Project from "../../lib/models/project.model";

function slugToTitle(slug: string): string {
  return slug.replace(/-/g, " ").trim();
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  const title = await params;
  const normalisedTitle = slugToTitle(title.title);

  await connectToDb();
  const project = await Project.findOne({ name: normalisedTitle }).lean();

  if (!project)
    return Response.json({ message: "Project not found" }, { status: 404 });

  return Response.json(project, { status: 200 });
}
