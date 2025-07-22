const surahDropdown = document.getElementById('surahDropdown')
const ayahDropdown = document.getElementById('ayahDropdown')
fetch('https://api.quran.com/api/v4/chapters').then(res=>res.json())
.then(data=>{
    surahDropdown.innerHTML = '<option>Enter Surah</option>'
    ayahDropdown.innerHTML = '<option>Enter Ayah</option>'
    data.chapters.forEach(surah=>{
        const surahOption = document.createElement('option')
        surahOption.value = surah.id

        surahOption.textContent = `${surah.id}: ${surah.name_simple}`
        surahOption.setAttribute('ayahCount', surah.verses_count)
        surahDropdown.appendChild(surahOption)
    })
})

surahDropdown.addEventListener('change', function(){
    ayahDropdown.innerHTML = '<option>Enter Ayah</option>'
    // console.dir(this)
    const ayahCount = this.options[this.selectedIndex].getAttribute('ayahCount')
    for(let i = 1; i<=ayahCount;i++){
        const option = document.createElement('option')
        option.value = i
        option.textContent = i
        option.setAttribute('surahNumber', surahDropdown.options[surahDropdown.selectedIndex].value)
        ayahDropdown.appendChild(option)
    }
})

ayahDropdown.addEventListener('change', function(){
   const surahNumber = +(this.options[this.selectedIndex].getAttribute('surahNumber'))
   const ayahNumber = +this.options[this.selectedIndex].value
   fetch(`https://quranapi.pages.dev/api/${surahNumber}/${ayahNumber}.json`).then(res=>res.json())
   .then(data=>{


  document.querySelector('h4').textContent= `${data.surahName} (${data.surahNameTranslation}) ${data.surahNameArabic}`
  document.getElementById('arabic').innerText= data.arabic1
  document.getElementById('english').innerText= data.english 
  document.getElementById('urdu').innerText= data.urdu 

  document.querySelector('audio').src = data.audio['3'].url
//   console.log(data.quran[ayah])


})
fetch(`https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/en-tafisr-ibn-kathir/${surahNumber}/${ayahNumber}.json`).then(res=>res.json()).then(data=>{
    document.getElementById('tafsir').innerText = data.text
})
})

