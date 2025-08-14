import tagModel from "../models/tag.mjs";

export async function removeTagsConnections(id, tagNames) {
  try {
    for (let i = 0; i < tagNames.length; i++) {
      /* szuka tagu i z .seriesAttached usuwa id serii */
      const tag = await tagModel.findOne({ name: tagNames[i] });
      if (!tag) {
        return;
      }
      const seriesAttachedSet = new Set(tag.seriesAttached);
      seriesAttachedSet.delete(id);
      tag.seriesAttached = [...seriesAttachedSet];
      await tag.save();
    }
  } catch (e) {
    console.log(e);
  }
}
export async function addTagsConnections(id, tagNames) {
  try {
    id = id.toString();
    for (let i = 0; i < tagNames.length; i++) {
      let tag = await tagModel.findOne({ name: tagNames[i] });
      if (!tag) {
        continue;
      }
      tag.seriesAttached.push(id);
      tag.seriesAttached = [...new Set(tag.seriesAttached)];
      /* zamiana na set zapobiega 
      dodaniu ponownie tego samego id do tablicy */
      await tag.save();
    }
  } catch (e) {
    console.log(e);
  }
}
export async function updateConnections(id, newTagNames, oldTagNames) {
  /* usuwa poprzednie powiązania i tworzy nowe, dzięki czemu
      nie trzeba sprawdzać, które tagi usunąć,a które zostawić.
    */
  await removeTagsConnections(id, oldTagNames);
  await addTagsConnections(id, newTagNames);
}
