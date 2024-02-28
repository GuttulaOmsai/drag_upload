const dropArea = document.querySelector(".drag-area");
const dragText = dropArea.querySelector("header");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("input");
let file;

button.onclick = () => {
  input.click();
};

input.addEventListener("change", function () {
  file = this.files[0];
  showFile();
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  showFile();
});

function showFile() {
  const validFileExtensions = ["jpg", "jpeg", "png", "pdf", "doc", "docx"];
  const fileExtension = file.name.split(".").pop().toLowerCase();

  if (validFileExtensions.includes(fileExtension)) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileExtension === "pdf") {
        const blob = new Blob([fileReader.result], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(blob);

        const iframeElement = document.createElement("iframe");
        iframeElement.src = blobUrl;
        iframeElement.type = "application/pdf";
        iframeElement.width = "100%";
        iframeElement.height = "500px";

        
        dropArea.innerHTML = '';
        dropArea.appendChild(iframeElement);
      } else if (["jpg", "jpeg", "png"].includes(fileExtension)) {
        dropArea.innerHTML = `<img src="${fileReader.result}" alt="">`;
      } else {
        alert("Invalid file type. Please select a valid image, PDF, or document file.");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
      }
    };

    
    if (["jpg", "jpeg", "png"].includes(fileExtension)) {
      fileReader.readAsDataURL(file);
    } else {
      fileReader.readAsArrayBuffer(file);
    }
  } else {
    alert("Invalid file type. Please select a valid image, PDF, or document file.");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
