document.addEventListener('DOMContentLoaded', () => {

  const dbc = firebase.firestore();

  function getQueryParam(param) {
    return new URLSearchParams(window.location.search).get(param);
  }

  const consoleName = getQueryParam('name');

  if (consoleName) {
    dbc.collection('consoles')
      .where('name', '==', consoleName)
      .limit(1)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          updateBreadcrumb(snapshot.docs[0].data().name);
        } else {
          updateBreadcrumb('Console inconnue');
        }
      })
      .catch((err) => {
        console.error("Erreur Firestore:", err);
        updateBreadcrumb('Erreur console');
      });
  } else {
    updateBreadcrumb('Console inconnue');
  }

  function updateBreadcrumb(name) {
    const breadcrumb = document.querySelector('.breadcrumb ol');
    if (!breadcrumb) return;
    const li = document.createElement('li');
    li.textContent = name;
    breadcrumb.appendChild(li);
  }
});
