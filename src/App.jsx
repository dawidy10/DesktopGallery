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
			tags: ["amogus, test"], // poți popula mai târziu cu taguri reale
		}));

		setImages(imagData);
	};

	const handleUpdatePosition = (id, newX, newY) => {
		setImages((prevImages) => prevImages.map((img) => (img.id === id ? { ...img, x: newX, y: newY } : img)));
	};

	return (
		<>
			<div className="py-14">
				<button
					onClick={handleSelectFolder}
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
				>
					Selectează folder
				</button>

				<div className="flex gap-4 relative">
					{images.map((src, i) => (
						<CanvasImage
							image={src}
							index={i}
							isSelected={false}
							key={i}
							alt=""
							className="rounded shadow"
							onUpdatePosition={handleUpdatePosition}
						/>
					))}
				</div>
				{folderPath && <p className="mt-3 text-gray-700 fixed right-10 bottom-10">{folderPath}</p>}
			</div>
		</>
	);
}
