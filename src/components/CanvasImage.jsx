import { useState, useRef } from "react";

export function CanvasImage({ image, isSelected, onUpdatePosition, index }) {
	const [showTags, setShowTags] = useState(false);
	const isDragging = useRef(false);
	const startPos = useRef({ x: 300, y: 300 });

	const handleMouseDown = (e) => {
		// Prevenim drag-ul default al imaginii din browser
		e.preventDefault();

		isDragging.current = true;
		// Calculăm offset-ul dintre mouse și colțul imaginii
		startPos.current = {
			x: e.clientX - image.x,
			y: e.clientY - image.y,
		};

		const handleMouseMove = (moveEvent) => {
			if (!isDragging.current) return;

			const newX = moveEvent.clientX - startPos.current.x;
			const newY = moveEvent.clientY - startPos.current.y;

			// Trimitem noile coordonate către părinte (unde se află array-ul de imagini)
			onUpdatePosition(image.id, newX, newY);
		};

		const handleMouseUp = () => {
			isDragging.current = false;
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	return (
		<div
			className={`absolute cursor-grab active:cursor-grabbing group ${isSelected ? "z-10" : ""}`}
			style={{
				width: `${image.width}px`,
				height: `${image.height}px`,
				// Folosim translate3d pentru GPU acceleration
				transform: `translate3d(${image.x}px, ${image.y}px, 0) rotate(${image.rotation}deg)`,
				position: "absolute",
				top: 0,
				left: index * `${image.width}`,
				willChange: "transform", // Spune browserului să se pregătească pentru animație
			}}
			onMouseDown={handleMouseDown} // Adăugăm handler-ul aici
			onMouseEnter={() => setShowTags(true)}
			onMouseLeave={() => setShowTags(false)}
		>
			{/* Restul codului tău rămâne la fel */}
			<div
				className={`relative w-full h-full rounded-lg overflow-hidden shadow-lg ${
					isSelected ? "ring-2 ring-blue-500" : ""
				}`}
			>
				<img
					loading="lazy"
					src={image.src}
					alt="Canvas"
					className="w-full h-full object-cover pointer-events-none"
				/>
				{/* ... tags ... */}
			</div>
		</div>
	);
}
