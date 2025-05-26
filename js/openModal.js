export default function openModal(index) {
  const modal = document.querySelector(".video-modal");
  const frame = document.querySelector(".video-frame");

  const youtubeUrls = [
    "https://youtu.be/I_zy5VkxLi4?si=a1TDzRGwJE9EgiEs", // 샴슈(신환)
    "https://youtu.be/sWoH1Do0rrs?si=nQ2Kq2gEZkqfHpV9", // 눈마(정기)
    "https://youtu.be/KsQknNu-bdM?si=0zkaI-Yv_zBe7755", // 눈마(신환)
    "https://youtu.be/Wb7WLvAFiwg?si=XOodjGB32H4CxDsL", // neo(산환)
    "https://youtu.be/UC5kFgq9OhE?si=zl6JN2eHLFDja5Xh", // neo(정기)
    "https://youtu.be/cfMAC_xSg7Y?si=YSy8kc-R-ObmxUcp", // 링링(신환)
    "https://youtu.be/yCW2h9TEoVM?si=IkQKfmN_fEhJXwde", // 링링(정기)
    "https://youtu.be/zcckhcGhXgM?si=oKXBFT_nGU_U7GfI", // Apt(오픈스테이지) 
    "https://youtu.be/tseV3F8bvi4?si=Wq8hiUnvYfaMrjA8", // 맨정신(오픈스테이지) 
  ];

  const embedUrls = youtubeUrls.map((url) => {
    const videoId = url.match(/youtu\.be\/([^\?]+)/)?.[1];
    return `https://www.youtube.com/embed/${videoId}`;
  });

  frame.src = embedUrls[index % embedUrls.length];
  modal.style.display = "flex";

  const closeButton = document.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    const modal = document.querySelector(".video-modal");
    const frame = document.querySelector(".video-frame");
    modal.style.display = "none";
    frame.src = "";
  });
}
