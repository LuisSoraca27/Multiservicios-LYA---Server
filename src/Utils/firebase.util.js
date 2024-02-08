import { initializeApp } from "firebase/app";
import dotenv from 'dotenv'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import imgCombo from "../Models/imgCombo.js";
import imgCourse from "../Models/imgCourse.model.js"
import imgLicense from "../Models/imgLicense.model.js";


dotenv.config()

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Storage service
const storage = getStorage(app)

export const uploadProductImg = async (img, idModel, productId, prefix, modelProduct) => {
	// Create firebase reference
	const lastIndex = img.originalname.lastIndexOf('.');
	const originalName = img.originalname.slice(0, lastIndex);
	const ext = img.originalname.slice(lastIndex + 1);


	const filename = `${prefix}/${productId}/${originalName}-${Date.now()}.${ext}`;
	const imgRef = ref(storage, filename);

	// Upload image to Firebase
	const result = await uploadBytes(imgRef, img.buffer);

	await modelProduct.create({
		productId,
		urlImagen: result.metadata.fullPath,
	});

};


// Guardar y obtener imagenes de Combos

export const uploadComboImg = async (img, IdCombo) => {
	console.log(img)
	// Create firebase reference
	const lastIndex = img.originalname.lastIndexOf('.');
	const originalName = img.originalname.slice(0, lastIndex);
	const ext = img.originalname.slice(lastIndex + 1);

	const filename = `Combo/${IdCombo}/${originalName}-${Date.now()}.${ext}`;
	const imgRef = ref(storage, filename);

	// Upload image to Firebase
	const result = await uploadBytes(imgRef, img.buffer);

	await imgCombo.create({
		comboId: IdCombo,
		urlImagen: result.metadata.fullPath,
	});

};

export const getCombosImgsUrls = async combos => {
	return Promise.all(
		combos.map(async combo => {
			const imgRef = ref(storage, combo.imgCombos[0].urlImagen);
			const imgUrl = await getDownloadURL(imgRef);
			combo.imgCombos[0].urlImagen = imgUrl;
			return combo;
		})
	);
};


// Guardar y obtener imagenes de Cursos

export const uploadCourseImg = async (img, idCourse) => {
	// Create firebase reference
	const [originalName, ext] = img.originalname.split('.'); // -> [pug, jpg]

	const filename = `Course/${idCourse}/${originalName}-${Date.now()}.${ext}`;
	const imgRef = ref(storage, filename);

	// Upload image to Firebase
	const result = await uploadBytes(imgRef, img.buffer);

	await imgCourse.create({
		courseId: idCourse,
		urlImagen: result.metadata.fullPath,
	});
};

export const getCoursesImgsUrls = async courses => {
	return Promise.all(
		courses.map(async course => {
			const imgRef = ref(storage, course.imgCourses[0].urlImagen);
			const imgUrl = await getDownloadURL(imgRef);
			course.imgCourses[0].urlImagen = imgUrl;
			return course;
		})
	);
};


// Guardar y obtener imagenes de Licencias

export const uploadLicenseImg = async (img, idLicense) => {
	// Create firebase reference
	const [originalName, ext] = img.originalname.split('.'); // -> [pug, jpg]

	const filename = `License/${idLicense}/${originalName}-${Date.now()}.${ext}`;
	const imgRef = ref(storage, filename);

	// Upload image to Firebase
	const result = await uploadBytes(imgRef, img.buffer);

	await imgLicense.create({
		licenseId: idLicense,
		urlImagen: result.metadata.fullPath,
	});
};



export const getLicensesImgsUrls = async licenses => {
	return Promise.all(
		licenses.map(async license => {
			const imgRef = ref(storage, license.imgLicenses[0].urlImagen);
			const imgUrl = await getDownloadURL(imgRef);
			license.imgLicenses[0].urlImagen = imgUrl;
			return license;
		})
	);
};


// crea una funcion que reciba la url de una imagen en firebase y la elimine
export const deleteImg = async (url) => {
	const imgRef = ref(storage, url);
	await deleteObject(imgRef);
}