const menuToggle = () => {
    const hamburgerButton = document.querySelectorAll(".menu-icon");
    const navBarMenu = document.querySelector(".navbar");
    hamburgerButton.forEach((btn) => {
        btn.addEventListener("click", function(){ 
            btn.classList.toggle("open");
            navBarMenu.classList.toggle("open");
        });
    })
}

const productItem = async () => {
   const body = document.getElementsByTagName("BODY")[0];
   const category = body.dataset?.category;
   
   const response = await fetch("/js/products.json");
   const products = await response.json();
   const productItem = products.data.filter((item) => item.category_name ===  category);

    // JSON verilerini HTML olarak hazırla
    const productItems = document.querySelector(".product");
    const itemHTML = `
        ${productItem[0].product.map((item) => `
            <div class="product-item">
                <a href="${item.link}">
                    <div class="product-img">
                        <img src="${item.image_url}" />
                    </div>
                    <div class="product-title">
                        ${item.product_name}
                    </div>
                    <div class="product-price">
                        ${item.price}
                    </div>
                  </a>
              </div>
        `).join('')}
    `;

    productItems.innerHTML = itemHTML;
}

const productDetailItem = async () => {
    const body = document.getElementsByTagName("BODY")[0];
    const category = body.dataset?.category;
    
    const response = await fetch("/js/products.json");
    const products = await response.json();
    const productItem = products.data.filter((item) => item.category_name ===  category);
    const pathname = window.location.pathname.split( '/' )[2].replace(".html", "");
    const product = productItem[0].product.filter((item) => item.link.includes(pathname));
    const arr = JSON.parse(localStorage.getItem("lastProducts")) || [];

    arr.push(product[0]);
    let lastStoragePage = JSON.stringify(arr);
    
    localStorage.setItem("lastProducts", lastStoragePage)

    //  JSON verilerini HTML olarak hazırla
     const productItems = document.querySelector(".product-detail");
     const itemHTML = `
         ${product.map((item) => `
             <div class="product-item">
            
                     <div class="product-img">
                         <img src="${item.image_url}" />
                     </div>
                     <div class="product-content">
                        <div class="product-title">
                            ${item.product_name}
                        </div>
                        <div class="product-price">
                            ${item.price}
                        </div>-
                     </div>
               </div>
         `).join('')}
     `;
 
     productItems.innerHTML = itemHTML;
 }

 const campainsBar = () => {
    const body = document.getElementsByTagName("BODY")[0];
    const getLastStoragePage = localStorage.getItem("lastProducts") || "";
    const campainList = JSON.parse(getLastStoragePage) < 3 ? JSON.parse(getLastStoragePage) : JSON.parse(getLastStoragePage).slice(-3);
    
    const itemHTML = `
    <div class="campain-icon"><i class="fa-solid fa-bell"></i><i class="fa-solid fa-x"></i></div>
    <div class="campain-box">
         ${campainList.reverse().map((item) => `
             <div class="product-item">
                <a href="${item.link}">
                     <div class="product-img">
                         <img src="${item.image_url}" />
                     </div>
                     <div class="product-content">
                        <div class="product-title">
                            ${item.product_name}
                        </div>
                        <div class="product-price">
                            ${item.price}
                        </div>
                        </div>
                    <div class="product-campain">
                        ${item.campaing}
                    </div>
                    </a>
               </div>
         `).join('')}
     </div>`;
     
 
     campainList.length > 2 ? body.insertAdjacentHTML("afterend",itemHTML) : "";

 }


 const campainToggle = () => {
    const campainButton = document.querySelectorAll(".campain-icon");
    const campainBox = document.querySelector(".campain-box");
    campainButton.forEach((btn) => {
        btn.addEventListener("click", function(){ 
            campainBox.classList.toggle("open");
            btn.classList.toggle("open")
        });
    })
}



window.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementsByTagName("BODY")[0];
    const pageType = body.dataset?.page;
    menuToggle();
    if(pageType === "detail") {
        productDetailItem();
    } else if (pageType === "category") {
        productItem();
    } else if(pageType !== "detail"){
        campainsBar();
        campainToggle();
    }
});