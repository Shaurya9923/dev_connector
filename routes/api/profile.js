const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const {check, validationResult} = require('express-validator');
const request = require('request');
const config = require('config');

// @route GET API/profile
// @desc Test route
// @access Public

router.get('/me', auth, async (req,res)=> {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name','avatar']);
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        res.json(profile);
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// Create or Update user profile
router.post('/', [auth, [
    check('status', 'Status is Required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty()
]], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin} = req.body;
    // Build profile object
    console.log(req.body);
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());
        console.log(profileFields.skills);
    }
    // Build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;
    try{
        let profile = await Profile.findOne({user: req.user.id})
        if(profile){
            // If profile exists, update it
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true});
            return res.json(profile);
        }
        // If profile does not exist, create it
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// Get All Profiles
router.get('/', async(req,res)=>{
    try{
        const profiles = await Profile.find().populate('user', ['name','avatar']);
        return res.status(200).json(profiles);
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
})

// Get Profile by User ID
router.get('/user/:user_id', async(req,res)=>{
    try{
        const profile = await Profile.findOne({user : req.params.user_id}).populate('user', ['name','avatar']);
        if(!profile){
            return res.status(400).json({msg: 'Profile not found'});
        }
        return res.status(200).json(profile);
    }catch(err){
        console.log(err);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send("Server Error");
    }
})

// Delete Profile, User and Posts
router.delete('/',auth,async(req,res)=>{
    try {
        // @todo - remove users posts
        // Remove Profile
        await Profile.findOneAndRemove({user: req.user.id});
        // Remove User
        await User.findOneAndRemove({_id: req.user.id});
        return res.status(200).json({msg: 'User Deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})

// Add Profile Experience
router.put('/experience',[auth,[
    check('title', 'Title is Required').not().isEmpty(),
    check('company', 'Company is Required').not().isEmpty(),
    check('from', 'From Date is Required').not().isEmpty()
]],async(req,res)=>{
    console.log("Hello")
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {title, company, location, from, to, current, description} = req.body;
    const newExp = {title, company, location, from, to, current, description};
    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.experience.unshift(newExp)
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})
// Delete Profile Experience
router.delete('/experience/:exp_id', auth, async(req,res)=>{
    try {
        console.log(req.params.exp_id);
        const profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1);
        await profile.save();
        return res.status(200).json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error'); 
    }
})

// Edit Profile Experience
router.put('/experience/:exp_id', [auth,[
    check('title', 'Title is Required').not().isEmpty(),
    check('company', 'Company is Required').not().isEmpty(),
    check('from', 'From Date is Required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {title, company, location, from, to, current, description} = req.body;
    const newExp = {title, company, location, from, to, current, description};
    try {
        const profile = await Profile.findOne({user: req.user.id});
        const editIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
        profile.experience[editIndex] = newExp;
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})

// Add Profile Education

router.put('/education',[auth,[
    check('school', 'School is Required').not().isEmpty(),
    check('degree', 'Degree is Required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is Required').not().isEmpty(),
    check('from', 'From Date is Required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {school, degree, fieldofstudy, from, to, current, description} = req.body;
    const newEdu = {school, degree, fieldofstudy, from, to, current, description};
    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.education.unshift(newEdu)
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// Delete Profile Education
router.delete('/education/:edu_id', auth, async(req,res)=>{
    try {
        console.log(req.params.exp_id);
        const profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex,1);
        await profile.save();
        return res.status(200).json(profile);
    } catch (error) {
       console.log(error.message);
       res.status(500).send('Server Error'); 
    }
})

// Edit Profile Education
router.put('/education/:edu_id', [auth,[
    check('school', 'Title is Required').not().isEmpty(),
    check('degree', 'Company is Required').not().isEmpty(),
    check('fieldofstudy', 'From Date is Required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {school, degree, fieldofstudy, from, to, current, description} = req.body;
    const newEdu = {school,degree,fieldofstudy, from, to, current, description};
    console.log(newEdu);
    try {
        const profile = await Profile.findOne({user: req.user.id});
        const editIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id);
        profile.education[editIndex] = newEdu;
        console.log(profile.education)
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})

// Get Github Repos
router.get('/github/:username', async(req,res)=>{
    try{
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method:'GET',
            headers:{'user-agent': 'node.js'}
        };
        request(options, (error,response,body)=>{
            if(error) console.error(error);
            if(response.statusCode !== 200){
                return res.status(404).json({msg: 'No Github Profile Found'});

            }
            res.json(JSON.parse(body));
            }
            
        )
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
})

module.exports = router;