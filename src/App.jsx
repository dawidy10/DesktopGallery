import React, { useState } from "react";
import { CanvasImage } from "./components/CanvasImage";

export default function App() {
	const [folderPath, setFolderPath] = useState(null);
	const [images, setImages] = useState([]);

	const handleSelectFolder = async () => {
		const folder = await window.api.selectFolder();
		if (!folder) return;
		setFolderPath(folder);

		const imgs = await window.api.readImages(folder);
		//setImages(imgs.map((p) => `local:///${p}`));

		const imagData = imgs.map((p, index) => ({
			id: `img-${index + 1}`,
			src: `local:///${p}`,
			x: 100,
			y: 100,
			width: 300,
			height: 200,
			rotation: 0,
			tags: [], // poți popula mai târziu cu taguri reale
		}));

		setImages(imagData);
	};

	return (
		<>
			<div className="p-4">
				<button
					onClick={handleSelectFolder}
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
				>
					Selectează folder
				</button>

				{folderPath && <p className="mt-3 text-gray-700">{folderPath}</p>}

				<div className="grid grid-cols-3 gap-4 mt-4">
					{images.map((src, i) => (
						<CanvasImage image={src} isSelected={false} key={i} alt="" className="rounded shadow" />
					))}
				</div>
			</div>
		</>
	);
}
