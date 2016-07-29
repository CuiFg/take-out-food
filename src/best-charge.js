function bestCharge(selectedItems)
{
  //return /*TODO*/;

  /*let  parsedItems =parseSelectedItems(selectedItems);
   let Items = loadAllItems();
   let cartItemsCount = getCartItemsCount(Items,parsedItems);
   let promotionItems = loadPromotions();
   let cartItemsCountType = getCartItemsCountType(cartItemsCount,promotionItems);
   let cartItemsCountTypePromotion = getPromotionItems(cartItemsCountType);

   let subTotalItems = getSubTotal(cartItemsCountTypePromotion);
   let saveMoney = getSaveMoney(cartItemsCountTypePromotion);
   let total = getTotal(cartItemsCountTypePromotion);
*/

}

function parseSelectedItems(selectedItems)
{
  return selectedItems.map(function(selectedItem){
    let selectedItemsPart = selectedItem.split("x");
    return {id: selectedItemsPart[0], count: parseFloat(selectedItemsPart[1]) || 1 };
  })
}

function getCartItemsCount(Items,parsedItems)
{
  let cartItemsCount =[];
  for(let i =0; i< parsedItems.length; i++)
  {
    for(let j=0; j< Items.length; j++)
    {
      if (parsedItems[i].id === Items[j].id)
      {
        cartItemsCount.push(Object.assign({},Items[j],{count:parsedItems[i].count}));
      }
    }
  }
  return  cartItemsCount;
}

function getCartItemsCountType(cartItemsCount,promotionItems)
{
  let cartItemsCountType = [];
//  let sameType=[];
  for (let m = 0; m < cartItemsCount.length; m++)
  {
     cartItemsCountType.push(Object.assign({}, cartItemsCount[m], {type: '满30减6元'}));
  }
  for (let n = 0; n < cartItemsCountType.length; n++)
  {

    for(let i = 0; i < promotionItems.length; i++)
    {
      if(promotionItems[i].type === '指定菜品半价')
      {
        for (let j = 0; j < promotionItems[i].items.length; j++)
        {
          if (cartItemsCountType[n].id === promotionItems[i].items[j])
          {
            cartItemsCountType[n].type = '指定菜品半价';
          }

        }
      }
    }
  }
  return cartItemsCountType;
}

function getPromotionItems(cartItemsCountType)
{
  let cartItemsCountTypePromotion = [];
  for(let i=0; i < cartItemsCountType.length; i++)
  {
    if(cartItemsCountType[i].type === '指定菜品半价' )
    {
      let promotionPrice = parseFloat(cartItemsCountType[i].price / 2);
      let promotionedPrice = parseFloat(cartItemsCountType[i].price / 2);
      cartItemsCountTypePromotion.push(Object.assign({},cartItemsCountType[i],
        {promotionPrice:promotionPrice, promotionedPrice: promotionedPrice}));
    }
    if(cartItemsCountType[i].type === '满30减6元')
    {
      cartItemsCountTypePromotion.push(Object.assign({},cartItemsCountType[i]));
    }
  }
  return cartItemsCountTypePromotion;
}

function  getSubTotal(cartItemsCountTypePromotion)
{
  let subTotalItems =[];
  for(let i=0; i < cartItemsCountTypePromotion.length; i++)
  {
    let subTotal = cartItemsCountTypePromotion[i].price *  cartItemsCountTypePromotion[i].count;
    subTotalItems.push(Object.assign({},cartItemsCountTypePromotion[i],{subTotal: subTotal} ));
  }
  return subTotalItems;
}

function getSaveMoney(subTotalItems)
{
  let saveMoney = 0;
  for(let i = 0; i < subTotalItems.length; i++ )
  {
    if(subTotalItems[i].type === "指定菜品半价")
    saveMoney += subTotalItems[i].promotionPrice * subTotalItems[i].count;
  }
  return saveMoney;
}

function getTotal(subTotalItems)
{
  let total = 0;
  for(let i = 0; i < subTotalItems.length; i++ )
  {
    total += subTotalItems[i].promotionedPrice;
  }
  return total;
}
