import fs from 'fs';
import path from 'path';

export async function getJsonData<T>({
  directory = 'constants',
  page,
  fileName,
}: {
  // Directory where the JSON file is located
  directory?: string;
  // Name of the page to access the corresponding JSON file
  page: string;
  // Name of the JSON file (without extension)
  fileName: string;
}): Promise<T> {
  // Construct the full path to the JSON file
  const filePath = path.join(
    process.cwd(), // Get the current working directory
    directory, // Add the specified directory
    page, // Add the specified page
    `${fileName}.json`, // Append the file name with .json extension
  );

  // Read the contents of the JSON file
  const fileContents = await fs.promises.readFile(filePath, 'utf8');

  // Parse and return the JSON data
  return JSON.parse(fileContents);
}
