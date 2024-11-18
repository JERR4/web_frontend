export interface Part {
  id: number;
  part_name: string;
  specification: string;
  oem_number: string;
  image: string;
  short_description: string;
  set_composition: string;
  dimensions: string;
  weight: number;
}

export interface PartResult {
  parts: Part[];
}

const getApiUrl = () => {
  return window.location.hostname;
}

export const getPartsByName = async (name = ""): Promise<PartResult> => {
  return fetch(`/api/parts/search/?part_name=${encodeURIComponent(name)}`)
    .then((response) => response.json())
    .then((data) => ({
      parts: Array.isArray(data.parts) 
        ? data.parts.map((part: Part) => {
            const apiUrl = getApiUrl();
            part.image = part.image.replace('localhost', apiUrl);
            return part;
          })
        : [],
    }));
};

export const getPartById = async (partId: number | string): Promise<Part> => {
  return fetch(`/api/parts/${encodeURIComponent(partId)}`)
    .then((response) => response.json())
    .then((part: Part) => {
      const apiUrl = getApiUrl();
      part.image = part.image.replace('localhost', apiUrl);
      return part;
    });
};