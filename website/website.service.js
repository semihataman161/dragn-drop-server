import Website from './website.model';


export const getWebsitesByUserId = async (userId) => {
  const websites = await Website.find({ userId });
  return websites;
}

export const createWebsite = async (request) => {
  const newWebsite = new Website(request);

  newWebsite.save(function (error) {
    if (error) {
      console.log('Error while saving website: ' + error);
      throw new Error(error);
    }
  });

  return newWebsite;
}
