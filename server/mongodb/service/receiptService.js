import { Receipt } from "../../schema/Schema.js";
import databaseProject from "../GetDataBase.js";
import { ObjectId } from "mongodb";
export const getAllReceipt = async (req, res, next) => {
  try {
    const result = await databaseProject.receipt
      .aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: "books",
            localField: "cart.bookID",
            foreignField: "_id",
            as: "cartDetail",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userID",
            foreignField: "_id",
            as: "userDetail",
          },
        },
      ])
      .toArray();
     let formatData={};
    const tmp = result.map((item, index) => {
      if (item.cartDetail.length > 0 && index > 0) {
        const newData = item.cart.map((value, number) => {
          
            return {
              bookName: item.cartDetail[number].name,
              price: item.cart[number].price,
              amount: item.cart[number].amount,
              email: item?.userDetail[0]?.email,
              status:item?.status
            };
          
        });
        formatData=Object.assign(newData,formatData)
        return newData;
      
      }
    });
    return res.json(formatData);
  } catch (error) {
    next(error);
  }
};
export const getFilterReceipt = async (req, res, next) => {
  try {
    if (req.userID.valueOf()) {
      const result = await databaseProject.receipt
        .aggregate([
          {
            $match: {
              userID: new ObjectId(`${req.userID.valueOf()}`),
            },
          },
          {
            $lookup: {
              from: "books",
              localField: "cart.bookID",
              foreignField: "_id",
              as: "result",
            },
          },
        ])
        .toArray();
      console.log("result",result);
      if(result.length <=0){
        
        return res.json("No Cart")
      }else{
        const resItem = result[0]?.cart.map((item, index) => {
          return {
            ...item,
            img: result[0].result[index].images[0],
            name: result[0].result[index].name,
          };
        });
        if (!resItem) {
          return res.json("null");
        }
        return res.json(resItem);
      }
      }
     
  } catch (error) {
    next(error);
  }
};
export const addToCart = async (req, res, next) => {
  try {
    const bookID = req.params.ID;
    const amount = req.body.amount ? req.body.amount : 1;
    console.log("amount", amount);
    const bookData = await databaseProject.book.findOne({
      _id: new ObjectId(bookID),
    });
    console.log(req.userID.valueOf());
    const userCart = await databaseProject.receipt.findOne({
      userID: req.userID,
      status: "In Cart",
    });
    if (bookData.amount < amount) {
      return next("Amount Error");
    }
    if (bookData.amount >= amount) {
      bookData.amount -= amount;
      try {
        const result = await databaseProject.book.updateOne(
          { _id: bookData._id },
          { $set: { amount: bookData.amount } }
        );
        console.log(result);
      } catch (error) {
        return next(error);
      }
    }
    console.log("userCart", userCart);
    if (userCart == null) {
      const receipt = new Receipt({
        userID: req.userID,
        date: new Date(),
        status: "In Cart",
        cart: [
          {
            amount: amount,
            discount: bookData.discount,
            price: bookData.price,
            bookID: new ObjectId(bookID),
          },
        ],
      });
      const result = await databaseProject.receipt.insertOne(receipt);
      res.json(result);
    } else {
      const bookItem = userCart.cart.find(
        (item, index) => item.bookID == bookID
      );
      if (bookItem) {
        bookItem.amount += amount;
        const index = userCart.cart.indexOf(bookItem);
        userCart.cart[index] = bookItem;
        const result = await databaseProject.receipt.updateOne(
          { userID: req.userID, status: "In Cart" },
          { $set: { cart: userCart.cart } }
        );
        return res.json({ message: "Success", result: result });
      }
      userCart.cart.push({
        amount: amount,
        discount: bookData.discount,
        price: bookData.price,
        bookID: new ObjectId(bookID),
      });
      console.log(userCart);
      const result = await databaseProject.receipt.updateOne(
        { userID: req.userID, status: "In Cart" },
        { $set: { cart: userCart.cart } }
      );
      return res.json({ message: "Success", result: result });
    }
  } catch (error) {
    return next(error);
  }
};
export const getHistory = async (req, res, next) => {
  const userID = req.userID.valueOf();
  try {
    const result = await databaseProject.receipt
      .find({ userID: new ObjectId(`${userID}`), status: "History" })
      .toArray();
    return res.json(result);
  } catch (error) {
    next(error);
  }
};
export const setHistory = async (req, res, next) => {
  const userID = req.userID.valueOf();
  const cart = req.body.cart;
  try {
    const result = await databaseProject.receipt.insertOne({
      date: new Date(),
      cart: cart,
      userID: userID,
      status: "History",
    });
    const cartUser = await databaseProject.receipt.findOne({
      userID: userID,
      status: "In Cart",
    });
    if (cart.length() < cartUser.cart.length()) {
      const newCart = cartUser.cart.filter(
        (item, index) => !cart.includes(item)
      );
      const updateResult = await databaseProject.receipt.updateOne(
        { userID: userID, status: "In Cart" },
        { cart: newCart, status: "History" }
      );
      return res.json(updateResult);
    } else {
      await databaseProject.receipt.deleteOne({
        userID: userID,
        status: "In Cart",
      });
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
};
