# 🧪 Production Testing Checklist
## Post-Deployment Verification for Intelysia

**Live URL**: https://intelysia-frontend.vercel.app (replace with your actual URL)

---

## ✅ **PHASE 1: Core Functionality Testing**

### **Homepage Testing**
- [ ] **Homepage loads**: `https://your-app.vercel.app`
- [ ] **Hero section displays**: Business directory branding
- [ ] **Categories visible**: Car dealers, jewelry, beauty, etc.
- [ ] **Search functionality**: Works without errors
- [ ] **Mobile responsive**: Test on phone/tablet
- [ ] **No console errors**: Check browser dev tools

### **Category Pages Testing (Your Original Issue)**
- [ ] **Car Dealers**: `https://your-app.vercel.app/category/car_dealer`
  - ✅ Should show automotive businesses (NOT "0 businesses found")
  - ✅ Should display: AutoPro Cotonou, CTBA, Garage Excellence
  - ✅ Business cards show: name, address, rating, phone

- [ ] **Jewelry**: `https://your-app.vercel.app/category/jewelry`
  - ✅ Should show luxury jewelry stores
  - ✅ Should display: Bijouterie Royale, Goldsmith Heritage

- [ ] **Beauty Salons**: `https://your-app.vercel.app/category/beauty_salon`
  - ✅ Should show luxury beauty salons
  - ✅ Should display: Salon Elegance Supreme, Beauté Royale

- [ ] **Spa Centers**: `https://your-app.vercel.app/category/spa`
  - ✅ Should show wellness centers
  - ✅ Should display: Spa Royale Wellness, Zenith Wellness

---

## ✅ **PHASE 2: SEO Article Testing**

### **Luxury Articles**
- [ ] **Jewelry**: `https://your-app.vercel.app/articles/luxury-jewelry-stores-cotonou-2025`
- [ ] **Beauty**: `https://your-app.vercel.app/articles/luxury-beauty-salons-cotonou-2025`
- [ ] **Spa**: `https://your-app.vercel.app/articles/luxury-spa-centers-cotonou-2025`

### **Porto-Novo Articles**
- [ ] **Hotels**: `https://your-app.vercel.app/articles/best-hotels-porto-novo-2025`
- [ ] **Restaurants**: `https://your-app.vercel.app/articles/best-restaurants-porto-novo-2025`
- [ ] **Banks**: `https://your-app.vercel.app/articles/banks-porto-novo-2025`

### **Article Quality Check**
- [ ] **Content loads**: Article text displays properly
- [ ] **Business listings**: Shows actual businesses with details
- [ ] **No debug errors**: No "Debug: No businesses found" messages
- [ ] **SEO elements**: Title, meta description present
- [ ] **Mobile friendly**: Readable on mobile devices

---

## ✅ **PHASE 3: Performance Testing**

### **Speed Tests**
- [ ] **Page Load Time**: <3 seconds on first visit
- [ ] **Subsequent loads**: <1 second (caching)
- [ ] **Mobile performance**: Good on 3G connection
- [ ] **Images load**: All business images display

### **Tools to Test With**
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **Lighthouse**: Built into Chrome DevTools

### **Target Metrics**
- [ ] **Performance Score**: >90
- [ ] **Accessibility**: >95
- [ ] **Best Practices**: >90
- [ ] **SEO Score**: >95

---

## ✅ **PHASE 4: Business Data Verification**

### **Data Accuracy**
- [ ] **Business names**: Display correctly
- [ ] **Addresses**: Show Cotonou/Porto-Novo locations
- [ ] **Phone numbers**: Format properly
- [ ] **Ratings**: Show realistic ratings (4.0-5.0)
- [ ] **Categories**: Businesses in correct categories

### **CSV Data Loading**
- [ ] **Automotive CSV**: Loading from `/data/automotive_businesses.csv`
- [ ] **Luxury CSV**: Loading from `/data/luxury_lifestyle_businesses.csv`
- [ ] **Porto-Novo CSV**: Loading from `/data/porto_novo_businesses.csv`
- [ ] **No CORS errors**: CSV files accessible

---

## ✅ **PHASE 5: User Experience Testing**

### **Navigation**
- [ ] **Category browsing**: Easy to find businesses
- [ ] **Search functionality**: Returns relevant results
- [ ] **Back button**: Works properly
- [ ] **Internal links**: Navigate between pages

### **Mobile Experience**
- [ ] **Touch targets**: Buttons easy to tap
- [ ] **Text readability**: Font size appropriate
- [ ] **Image scaling**: Photos fit screen
- [ ] **Menu functionality**: Mobile navigation works

---

## 🚨 **COMMON ISSUES TO CHECK**

### **If Category Pages Show "0 businesses"**
- **Issue**: CSV files not loading in production
- **Fix**: Check Network tab for 404 errors on CSV files
- **Solution**: Ensure all CSV files are in `/public/data/` folder

### **If Articles Show Debug Messages**
- **Issue**: Pattern matching not working
- **Fix**: Check URL format matches routing patterns
- **Solution**: Verify article URLs match patterns in ArticlePage.tsx

### **If Images Don't Load**
- **Issue**: Image URLs pointing to localhost
- **Fix**: Check image paths are relative
- **Solution**: Update image URLs to use Vercel domain

---

## ✅ **SUCCESS CRITERIA**

### **Deployment is Successful When:**
- [ ] All category pages show businesses (no "0 found" errors)
- [ ] All article URLs load without debug messages
- [ ] Page load times <3 seconds
- [ ] Mobile experience is smooth
- [ ] No console errors in browser
- [ ] All CSV data loads properly

### **Ready for Real Users When:**
- [ ] All tests above pass
- [ ] Performance scores >90
- [ ] SEO elements configured
- [ ] Analytics tracking (optional)
- [ ] Custom domain (optional)

---

## 🎯 **NEXT STEPS AFTER TESTING**

1. **If all tests pass**: ✅ Ready for real users!
2. **If issues found**: 🔧 Fix and redeploy
3. **Performance optimization**: 📈 Improve scores
4. **Custom domain**: 🌐 Setup professional URL
5. **Analytics**: 📊 Track user behavior

---

**Test everything systematically and report any issues! 🚀**