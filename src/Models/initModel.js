import User from '../Models/user.model.js'
import Account from '../Models/account.model.js'
import Combo from '../Models/combo.model.js'
import Course from '../Models/course.model.js'
import License from '../Models/license.model.js'
import Profile from '../Models/profile.model.js'
import Order from '../Models/order.model.js'
import imgLicense from './imgLicense.model.js'
import imgCourse from '../Models/imgCourse.model.js'
import CategoriesCP from '../Models/categoriesCP.model.js'
import ProfileInCombo from '../Models/profileInCombo.model.js'
import imgCombo from './imgCombo.js'
import Gift from './gift.model.js'
import Notifications from './notifications.model.js'
import ProductPurchased from './productPurchased.model.js'
import HistoryRecharge from './historyRecharge.model.js'


const initModels = () => {

    // 1 User <----> M Account
    User.hasMany(Account, { foreignKey: "userId" });
    Account.belongsTo(User);

    // 1 User <----> M Combo
    User.hasMany(Combo, { foreignKey: "userId" });
    Combo.belongsTo(User);

    // 1 User <----> M Course
    User.hasMany(Course, { foreignKey: "userId" });
    Course.belongsTo(User);

    // 1 User <----> M License
    User.hasMany(License, { foreignKey: "userId" });
    License.belongsTo(User);

    // 1 User <----> M Profile
    User.hasMany(Profile, { foreignKey: "userId" });
    Profile.belongsTo(User);

    // 1 User <----> M Order
    User.hasMany(Order, { foreignKey: "userId" });
    Order.belongsTo(User);

    // 1 User <----> M Gift
    User.hasMany(Gift, { foreignKey: "userId" });
    Gift.belongsTo(User);

    User.hasMany(Order, { foreignKey: "userId" });
    Order.belongsTo(User);

    // 1 User <----> M Notifications
    User.hasMany(Notifications, { foreignKey: "userId" });
    Notifications.belongsTo(User);
   
    // 1 User <----> M Recharge
    User.hasMany(HistoryRecharge, { foreignKey: "userId" });
    HistoryRecharge.belongsTo(User);

    // 1 Course <----> M imgCourse
    Course.hasMany(imgCourse, { foreignKey: "courseId" });
    imgCourse.belongsTo(Course);

    // 1 License <----> M imgLicense
    License.hasMany(imgLicense, { foreignKey: "licenseId" });
    imgLicense.belongsTo(License);

    Combo.hasMany(imgCombo, { foreignKey: "comboId" });
    imgCombo.belongsTo(Combo);

    // 1 Account <----> 1 CategoriesCP
    CategoriesCP.hasOne(Account, { foreignKey: "categoryId" });
    Account.belongsTo(CategoriesCP, { foreignKey: "categoryId" });

    CategoriesCP.hasOne(Profile, { foreignKey: "categoryId" });
    Profile.belongsTo(CategoriesCP, { foreignKey: "categoryId" });


    // 1 Order <----> M Profile
    Profile.hasMany(Order, { foreignKey: 'productId', constraints: false });
    Order.belongsTo(Profile, { foreignKey: 'productId', constraints: false });

    // 1 Order <----> M Account
    Account.hasMany(Order, { foreignKey: 'productId', constraints: false });
    Order.belongsTo(Account, { foreignKey: 'productId', constraints: false });

    // 1 Order <----> M Combo
    Combo.hasMany(Order, { foreignKey: 'productId', constraints: false });
    Order.belongsTo(Combo, { foreignKey: 'productId', constraints: false });

    // 1 Order <----> M License
    License.hasMany(Order, { foreignKey: 'productId', constraints: false });
    Order.belongsTo(License, { foreignKey: 'productId', constraints: false });

    // 1 Order <----> M Profile
    Course.hasMany(Order, { foreignKey: 'productId', constraints: false });
    Order.belongsTo(Course, { foreignKey: 'productId', constraints: false });

    // 1 Order <----> 1 productPurchased
    Order.hasOne(ProductPurchased, { foreignKey: 'orderId' });
    ProductPurchased.belongsTo(Order, { foreignKey: 'orderId' });

    // 1 Combo <----> M ProfileInCombo
    Combo.hasMany(ProfileInCombo, { foreignKey: 'comboId' });
    ProfileInCombo.belongsTo(Combo, { foreignKey: 'comboId' });

    // 1 Profile <----> 1 ProfileInComb
    Profile.hasOne(ProfileInCombo, { foreignKey: 'profileId' });
    ProfileInCombo.belongsTo(Profile, { foreignKey: 'profileId' });

};

export default initModels;
