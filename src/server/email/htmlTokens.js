export function getTokenMap(doctor) {
  return {
    '{Doctor name}': `<b>${doctor.name}</b>`,
    '{Doctor reviewCount}': `${doctor.reviewCount}`,
    '{Doctor rating}': `${doctor.rating}`,
    '{Doctor bestRating}': `${doctor.bestRating}`,
    '{Doctor worstRating}': `${doctor.worstRating}`,
    '{Doctor url}': `${doctor.url}`,
    '{Review author}': `${doctor.review.author}`,
    '{Review rating}': `${doctor.review.rating}`,
    '{Review comment}': `${doctor.review.comment}`,
  };
}

function replaceAll(original, map) {
  const reg = new RegExp(Object.keys(map).join('|'), 'gi');
  return original.replace(reg, (matched) => map[matched]);
}

export function buildHTMLMessage(doctor, original) {
  const tokenMap = getTokenMap(doctor);
  return replaceAll(original, tokenMap);
}

export default { buildHTMLMessage, getTokenMap };
