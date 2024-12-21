const prisma = require("../prisma");

const seed = async () => {  
  const createUsers = async () => {
    const users = [
        {username: 'Logan', password: 'pw1',},
        {username: 'Lincoln', password: 'pw2',},
        {username: 'Chase', password: 'pw3',},
        {username: 'Boots', password: 'pw4',},
    ];
    await prisma.user.createMany({ data: users });
  };


  const createItems = async () => {
    const items = [
      { itemName: "Brush" },
      { itemName: "Chew toy" },
      { itemName: "Ball" },
      { itemName: "Treat" },
      { itemName: "Kibble" },
    ];
    await prisma.item.createMany({ data: items });
  };


  const createReviews = async () => {
    const reviews = [
      { item_id: 1, user_id: 1, rating: 2.5, title:'brush review by logan', body: 'good brush' },      
      { item_id: 2, user_id: 2, rating: 5.5, title:'chew toy review by lincoln', body: 'good and chewy' },
      { item_id: 3, user_id: 3, rating: 6.6, title:'ball review by chase', body: 'bouncy ball' },
      { item_id: 4, user_id: 4, rating: 10.5, title:'treat review by boots', body: 'yum' },
      { item_id: 5, user_id: 1, rating: 7.4, title:'kibble by logan', body: 'its aight' },

    ];
    await prisma.review.createMany({ data: reviews });
  };

  const createComments = async () => {
    const comments = [
        {review_id: 1, user_id: 1, title: 'brush comment' },
        {review_id: 2, user_id: 2, title: 'chew toyy comment'},
        {review_id: 3, user_id: 3, title: 'ball comment'},
        {review_id: 4, user_id: 4, title: 'treat comment'},
        {review_id: 5, user_id: 1, title: 'kibble comment'}
    ]
    await prisma.comment.createMany({data: comments})
  }

  await createUsers();
  await createItems();
  await createReviews();
  await createComments();
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });