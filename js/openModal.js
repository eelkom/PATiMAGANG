export default function openModal(index) {
  const modal = document.querySelector(".video-modal");
  const frame = document.querySelector(".video-frame");

  const youtubeUrls = [
    "https://youtu.be/sWoH1Do0rrs?si=nQ2Kq2gEZkqfHpV9",
    "https://youtu.be/UC5kFgq9OhE?si=zl6JN2eHLFDja5Xh",
    "https://youtu.be/yCW2h9TEoVM?si=IkQKfmN_fEhJXwde",
    "https://youtu.be/KsQknNu-bdM?si=0zkaI-Yv_zBe7755",
    "https://youtu.be/Wb7WLvAFiwg?si=XOodjGB32H4CxDsL",
    "https://youtu.be/I_zy5VkxLi4?si=a1TDzRGwJE9EgiEs",
    "https://youtu.be/cfMAC_xSg7Y?si=YSy8kc-R-ObmxUcp",
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
