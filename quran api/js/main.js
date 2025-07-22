const surahDropdown = document.getElementById("surahDropdown");
surahDropdown.innerHTML = `<option>Enter Surah</option>`;
const surahData = fetch("https://api.quran.com/api/v4/chapters").then((res) =>
  res.json()
);
surahData.then((data) => {
    data.chapters.forEach((surah) => {
      const option = document.createElement("option");
      option.value = surah.id;
      option.setAttribute('ayahCount', surah.verses_count)
      option.textContent = `${surah.id}: ${surah.name_simple}`;
      surahDropdown.append(option);
    });
  })
  .catch((err) => {
    console.log("error", err);
  });
  
  const ayahDropdown = document.getElementById("ayahDropdown");
  ayahDropdown.innerHTML = `<option>Enter Ayah</option>`;
  document.getElementById("surahDropdown").addEventListener("change", function () {
    ayahDropdown.innerHTML = `<option>Enter Ayah</option>`;
    const ayahCount = (this.options[this.selectedIndex].getAttribute('ayahCount'))
  for(let i=1; i<=ayahCount; i++){
    const option = document.createElement('option')
    option.value=i; option.textContent = i
    ayahDropdown.appendChild(option)
  }
});

