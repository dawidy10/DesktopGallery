import { useState } from "react";
// import { ImageWithFallback } from './figma/ImageWithFallback';
// import { Badge } from './ui/badge';

export function CanvasImage({ image, isSelected, onClick, onDragStart, scale }) {
	const [showTags, setShowTags] = useState(false);

	return (
		<div
			className={`cursor-move group ${isSelected ? "z-10" : ""}`}
			style={{
				left: `${image.x}px`,
				top: `${image.y}px`,
				width: `${image.width}px`,
				height: `${image.height}px`,
				transform: `rotate(${image.rotation}deg)`,
			}}
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
			onMouseDown={(e) => {
				e.preventDefault();
				onDragStart(e, image.id);
			}}
			onMouseEnter={() => setShowTags(true)}
			onMouseLeave={() => setShowTags(false)}
		>
			<div
				className={`relative w-full h-full rounded-lg overflow-hidden shadow-lg ${
					isSelected ? "ring-2 ring-blue-500" : ""
				}`}
			>
				<img src={image.src} alt="Canvas image" className="w-full h-full object-cover" />

				{/* Tags overlay */}
				{image.tags.length > 0 && (showTags || isSelected) && (
					<div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
						<div className="flex flex-wrap gap-1">
							{image.tags.map((tag) => (
								<Badge
									key={tag}
									variant="secondary"
									className="text-xs bg-zinc-800/80 text-zinc-100 border-zinc-700"
								>
									{tag}
								</Badge>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
