const artworks = [
["GOD ETERNAL IN THE BODY","28 × 36 in","Acrylic","$950","faith"],
["HIDDEN MANNA","32 × 48 in","Acrylic","$3,700","faith"],
["MEET THE GRAYS","24 × 28 in","Pencil","$550","life"],
["TEAR THESE DOWN I","12 × 18 in","Pilot pen","$35","faith"],
["TEAR THESE DOWN II","12 × 18 in","Pilot pen & marker","$35","faith"],
["TROPICAL FISH STUDY I","16 × 20 in","Acrylic","$375","nature"],
["TROPICAL FISH STUDY II","16 × 20 in","Acrylic","$250","nature"],
["PERFECT PAIR","16 × 20 in","Acrylic","$385","nature"],
["HELMET OF SALVATION — SELF-PORTRAIT","14 × 20 in","Acrylic","$250","faith"],
["FIVE HORSES OF THE APOCALYPSE","24 × 36 in","Acrylic","$800","faith"],
["BACKYARD BRAWL IN BLUE AND RED","24 × 36 in · Framed","Acrylic","$800","life"],
["TAR HEELS IN ACTION","28 × 36 in","Acrylic","$450","life"],
["IN ONE ACCORD I","24 × 36 in · Framed","Pen & ink","$950","faith"],
["IN ONE ACCORD II","24 × 36 in · Framed","Pencil","$950","faith"],
["PINK'S ON THE LINKS","28 × 40 in","Acrylic","$600","life"],
["STUDY IN ORANGE AND BLACK","40 × 60 in","Acrylic","$800","nature"],
["SALTWATER CONVENTION I","40 × 60 in","Acrylic","$1,250","nature"],
["SALTWATER CONVENTION II","22 × 30 in","Acrylic","$250","nature"],
["SALTWATER CONVENTION III","24 × 30 in","Acrylic","$250","nature"],
["SALTWATER CONVENTION IIII","22 × 28 in","Acrylic","$250","nature"],
["BILLY CANNON","22 × 48 in","Acrylic","SOLD","life"],
["TRENCH WAR","24 × 36 in","Acrylic","$475","life"],
["GUARD YOUR MIND","24 × 36 in","Acrylic & pilot pen","$285","faith"],
["FULL ARMOR OF GOD","24 × 36 in","Acrylic & pilot pen","$285","faith"],
["I WILL NEVER LEAVE YOU","24 × 36 in · Framed","Acrylic & ballpoint pen","$650","faith"],
["OIL AND WATER JAMBOREE","40 × 40 in","Acrylic & enamel","$400","nature"],
["AGAINST THE FLOW","24 × 40 in","Acrylic","$275","nature"],
["PEACOCK STUDY","24 × 38 in","Acrylic","$950","nature"],
["STICKING TOGETHER I","24 × 38 in","Acrylic","$350","nature"],
["STICKING TOGETHER II","24 × 36 in","Acrylic","$350","nature"],
["APOCALYPSE NOW","28 × 40 in","Acrylic","$500","faith"],
["KEEPER OF THE GARDEN","20 × 30 in · Framed","Tempera paint","$500","nature"],
["THE ORANGE FAMILY","18 × 24 in","Acrylic & ink pen","$475","nature"],
["RUTH AND BOAZ","4 × 5 ft","Acrylic","$950","faith"],
["SUNRISE IN NORTHERN WISCONSIN","38 × 48 in","Acrylic","$750","nature"],
["THE 19TH HOLE","36 × 48 in","Acrylic","$750","life"],
["THE GREAT AWAKENING I","18 × 24 in","Acrylic","$500","faith"],
["THE GREAT AWAKENING II","18 × 22 in · Calligraphy","Acrylic & pen","$285","faith"],
["CITRUS PERFECTION","18 × 24 in","Acrylic","$375","nature"],
["THE MAGNIFICENT MIND","24 × 32 in","Acrylic","$750","faith"],
["SHOREBIRD STUDY","24 × 40 in","Acrylic","$650","nature"],
["WHAT GOD HAS MADE","18 × 22 in · Calligraphy","Acrylic & pilot pen","$285","faith"]
];
const imageFiles = [
  "god-eternal-in-the-body.jpg",
  "hidden-manna.jpg",
  "meet-the-grays.jpg",
  "tear-these-down-i.jpg",
  "tear-these-down-ii.jpg",
  "tropical-fish-study-i.jpg",
  "tropical-fish-study-ii.jpg",
  "perfect-pair.jpg",
  "helmet-of-salvation-self-portrait.jpg",
  "five-horses-of-the-apocalypse.jpg",
  "backyard-brawl-in-blue-and-red.jpg",
  "tar-heels-in-action.jpg",
  "in-one-accord-i.jpg",
  "in-one-accord-ii.jpg",
  "pinks-on-the-links.jpg",
  "study-in-orange-and-black.jpg",
  "saltwater-convention.jpg",
  "saltwater-convention-ii.jpg",
  "saltwater-convention-iii.jpg",
  "saltwater-convention-iiii.jpg",
  "billy-cannon.jpg",
  "trench-war.jpg",
  "guard-your-mind.jpg",
  "full-armor-of-god.jpg",
  "i-will-never-leave-you.jpg",
  "oil-and-water-jamboree.jpg",
  "against-the-flow.jpg",
  "peacock-study.jpg",
  "sticking-together-i.jpg",
  "sticking-together-ii.jpg",
  "apocalypse-now.jpg",
  "keeper-of-the-garden.jpg",
  "the-orange-family.jpg",
  "ruth-and-boaz.jpg",
  "sunrise-in-northern-wisconsin.jpg",
  "the-19th-hole.jpg",
  "the-great-awakening-i.jpg",
  "the-great-awakening-ii.jpg",
  "citrus-perfection.jpg",
  "the-magnificent-mind.jpg",
  "shorebird-study.jpg",
  "what-god-has-made.jpg"
];
const palette = ["#b87a55","#687d70","#c4a783","#7b7167","#c17b51","#607d7b","#d0b58e","#887f62"];
const grid = document.querySelector("#art-grid");
const search = document.querySelector("#art-search");
let activeFilter = "all";
function renderArt(){
  const term = search.value.trim().toLowerCase();
  const filtered = artworks.filter(a => (activeFilter === "all" || a[4] === activeFilter) && a.slice(0,4).join(" ").toLowerCase().includes(term));
  grid.innerHTML = "";
  if(!filtered.length){grid.innerHTML='<p class="empty-state">No artwork matched that search. Try another title or category.</p>';return;}
  filtered.forEach((a) => {
    const originalIndex = artworks.indexOf(a);
    const card = document.createElement("article");
    card.className = "art-card";
    const visual = document.createElement("div");
    visual.className = "artwork-image";
    visual.style.setProperty("--tone",palette[originalIndex % palette.length]);
    const artworkImage = document.createElement("img");
    artworkImage.src = "/assets/images/" + imageFiles[originalIndex];
    artworkImage.alt = a[0] + " — original artwork by Mike Killion";
    artworkImage.loading = "lazy";
    artworkImage.decoding = "async";
    const index = document.createElement("span");
    index.className = "art-index";
    index.textContent = String(originalIndex+1).padStart(2,"0");
    visual.append(artworkImage,index);
    const meta = document.createElement("div");meta.className="art-meta";
    const details = document.createElement("div");
    const title = document.createElement("h3");title.textContent=a[0];
    const info = document.createElement("p");info.textContent=[a[1],a[2]].join(" · ");
    details.append(title,info);
    const price = document.createElement("div");price.className=a[3]==="SOLD"?"sold":"art-price";price.textContent=a[3];
    meta.append(details,price);card.append(visual,meta);grid.append(card);
  });
}
document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
  button.classList.add("active");activeFilter=button.dataset.filter;renderArt();
}));
search.addEventListener("input",renderArt);
document.querySelector("#year").textContent=new Date().getFullYear();
const menuButton=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));menuButton.setAttribute("aria-label",open?"Close navigation":"Open navigation")});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false")}));
document.querySelector("#comment-form").addEventListener("submit",e=>{
  e.preventDefault();
  const data=new FormData(e.currentTarget);
  const subject=encodeURIComponent("Website message from "+data.get("name"));
  const body=encodeURIComponent("Name: "+data.get("name")+"\nEmail: "+data.get("email")+"\n\n"+data.get("message"));
  document.querySelector("#comment-status").textContent="Opening your email app with the message addressed to Mike.";
  window.location.href="mailto:navmike8@gmail.com?subject="+subject+"&body="+body;
});
renderArt();
