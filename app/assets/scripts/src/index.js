window.addEventListener('load', function() {
  const groups = document.getElementsByClassName('img-group');

  if (groups.length > 0) {
    Array.from(groups).forEach(group => {
      const [arrow] = group.getElementsByClassName('arrow'),
      [content] = group.getElementsByClassName('text-inline');

      if (arrow) {
        arrow.addEventListener('mouseenter', () => {
          content.style.cssText = "transition-duration: 0.2s; color: #FF6978;";
        })

        arrow.addEventListener('mouseleave', () => {
          content.style.cssText = "transition-duration: 0.2s; color: white;";
        })
      }
    }) 
  }
})