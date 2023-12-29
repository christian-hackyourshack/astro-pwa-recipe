export function handleMouseEvent(handle: (event: MouseEvent) => void) {
  return (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    handle(event);
  };
}
