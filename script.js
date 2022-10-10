// Задача на мячик


// var field = document.querySelector("#field");
// var ball = document.querySelector("#ball");
// var x = field.clientWidth / 2;
// var y = field.clientHeight / 2;
// var xBall = ball.clientWidth / 2;
// var yBall = ball.clientHeight / 2;

// function centerBall() {
//   ball.style.left = x - xBall + "px";
//   ball.style.top = y - yBall + "px";
// }
// document.querySelector("#field").addEventListener("click", centerBall)

var list = false;
var sum = 0;
var cart = [];
function getData() {
  
  var data = [
    {
      id: 1,
      title: "куртка", img: "https://imgcdn.befree.ru/rest/V1/images/1024/product/images/1931147148/1931147148_13_3.jpg", imgBack: "https://www.versace.ru/dw/image/v2/ABAO_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw9f08e3cc/original/90_1003636-1A02841_1B000_10_LaGrecaPufferJacket-Jackets-versace-online-store_0_0.jpg?sw=450&sh=632&sm=fit&sfrm=jpg", price: 200 },
      {id: 2, title: "куртка2", img: "https://trendy-u.com/wp-content/uploads/2021/07/Puffers.jpg", imgBack: "https://kosmo-shop.com/25192/kurtka-raduzhnaya-get-rainbow-mood-raduga-mnogocvetnaya-yarkaya-prikolnaya-veselaya.jpg", price: 201 },
      {id: 3, title: "куртка3", img: "https://static.insales-cdn.com/r/8JjyRSf9EYM/rs:fit:600:0:1/plain/images/products/1/2253/478554317/import_files_74_74bc8ce2-dc9b-11ea-a21b-782bcb2bb806_05ed0c61-55d5-11eb-bf52-ac1f6b908135.jpg", imgBack: "https://ledysoveti.ru/wp-content/uploads/2021/10/modnye-kurtki-47.jpg", price: 202 },
      {id: 4, title: "куртка4", img: "https://cdn.aizel.ru/i/550x826/1335134.jpg", imgBack: "https://www.uniqlo.com/ru/estore/public/bin/image/L3/SS21/k_jacket_desk.jpg", price: 203,
    },
    {id: 5, title:"Куртка5",
    img:"https://images.ru.prom.st/476134725_w640_h640_alyaska-n3b-2xl.jpg",imgBack:`http://ae01.alicdn.com/kf/HTB1gjKQh4TpK1RjSZR0q6zEwXXa7.jpg`,
    price:20,
  },
    {id: 6, title:"Куртка6",
    img:"https://images.ru.prom.st/476134725_w640_h640_alyaska-n3b-2xl.jpg",imgBack:`http://ae01.alicdn.com/kf/HTB1gjKQh4TpK1RjSZR0q6zEwXXa7.jpg`,
    price:50,
  },
    ];
    return data;
};
function outputData(data) {
  for (let i = 0; i < data.length; i++) {
    var title = data[i].title;
    var img = data[i].img;
    var price = data[i].price;
    var id = data[i].id;
    var card = `
    <div class="col">
    <div class="card  mb-3" style="width: 18rem;">
    <img src="${img}" class="card-img-top" width="100" height="400">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <h2 class="cart-title">${price}</h2>
      <a data-id="${id}" href="" class="btn-buy btn btn-primary">Купить</a>
    </div>
    </div>
    </div>`;
    document.querySelector(".items").insertAdjacentHTML("beforeend", card);
  }
};

function mouseOver(e, data) {
  
  if (e.target.matches("img")) {
    var source = e.target.src;
    data.forEach(function (obj) {
      if (obj.img == source) {
        e.target.src = obj.imgBack;
      }
    })
  }
};

function mouseOut(e, data) {
  
  if (e.target.matches("img")) {
    var source = e.target.src;
    data.forEach(function (obj) {
      if (obj.imgBack == source) {
        e.target.src = obj.img;
      }
    })
  }
}

function calcSum(price, count, symbol) {
  if (symbol == "+") {
    sum += price * count;
  } else {
    sum -= price * count;
    console.log(sum);
  }
  document.querySelector(".item-sum").textContent = sum;
}

function addProductToList(product) {
  var item = `<li data-id="${product.id}" class="  list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold"> ${product.title} </div>
          </div>
          <i class="text-dark" style="vertical-align:10px; font-size:14px"> x <b class="countItems">${product.count}</b> </i>
        <span class="badge bg-primary rounded-pill"> ${product.price} </span>
        <i class="ms-2 bi bi-x-circle text-danger" style="vertical-align:10px; font-size:14px"></i>
        </li>`;
        document.querySelector(".sum").insertAdjacentHTML("beforebegin", item);
}
function buyProduct(e,data) {
  if (e.target.matches(".btn-buy")) {
    e.preventDefault();
    document.querySelector("#cart span").textContent = Number(document.querySelector("#cart span").textContent) + 1;
    // var dataID = (e.target.dataset.id-1);
    var id = e.target.dataset.id
    var title, price;
    data.forEach (function (element) {
      if (element.id == id) {
        title = element.title;
        price = element.price;
        calcSum(price, 1, "+");
      }
    });
    


    var product = {
      id,
      title,
      price,
      count: 1
    };
    if (cart.length == 0) {
      cart.push(product);
      addProductToList(product);
    }else {
      try{
      cart.forEach((el,ind) =>{
        if (el.id == id ) {
          el.count++;
          document.querySelectorAll(".cart-list li").forEach(function(li) {
            if (li.dataset.id == id) {
              li.querySelector(".countItems").textContent = el.count;
              
            }
          })
          // document.querySelector(".countItems").textContent = el.count;
          throw new Error();
        } else if (ind == cart.length - 1) {
          cart.push(product);
          addProductToList(product);
        }
        
        
      });
      
    } catch (err) {}
  }
  
      
    
    document.querySelector("#cart span").classList.remove("visually-hidden");
    document.querySelector(".sum").classList.remove("visually-hidden");

    if (list == false) {
      list = true;
      document.querySelector(".cart-list").addEventListener("click", function (e) {
        if (e.target.matches(".cart-list li i")){
          e.target.parentElement.remove();
          var id = e.target.parentElement.dataset.id;
          
          cart.forEach(function (product, ind) {
            if (product.id == id) {
              cart.splice(ind, 1);
              calcSum(product.price, product.count, "-");
              document.querySelector("#cart span").textContent = Number(document.querySelector("#cart span").textContent) - product.count;
            }
          });
          console.log(cart);

          if (document.querySelector(".cart-list").children.length < 2) {
            document.querySelector("#cart span").classList.add("visually-hidden")
            document.querySelector(".sum").classList.add("visually-hidden")
          } 

          
        }
        
      });
      
    }
  }
}


document.addEventListener("DOMContentLoaded", function () {
  
  var data = getData();
  outputData(data);



document.querySelector(".items").addEventListener("mouseover", function (e) {
  mouseOver(e, data);      // Способ первый
});

// document.querySelector(".items").addEventListener("mouseover", mouseOver.bind(this, data));  // Способ два

document.querySelector(".items").addEventListener("mouseout", function (e) {
  mouseOut(e, data);
});


document.querySelector(".items").addEventListener("click", function (e) {
  buyProduct(e, data);
});

document.querySelector("#cart i").addEventListener("click", function () {
  document.querySelector(".cart-list").classList.toggle("visually-hidden");
});


  document.querySelector(".delete-all").addEventListener("click", function () {
    document.querySelectorAll(".cart-list li").forEach(function(element) {
      element.remove();
      cart = [];
    });
    sum = 0;
    document.querySelector("#cart span").textContent = 0;
    document.querySelector("#cart span").classList.add("visually-hidden");
    document.querySelector(".sum").classList.add("visually-hidden");
  })
  
  




});


