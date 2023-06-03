import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Form, FormGroup, Input, Label, Button, InputGroup, UncontrolledAlert, Alert } from 'reactstrap';
import Header from '../containers/Header'
import { useNavigate } from 'react-router-dom/dist';

const RecipeCreateContainer = () => {

const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset, control } = useForm({defaultValues: {ingredients: [{ingredient: ''}]}});
const { append, remove, fields  } = useFieldArray({ control, name: 'ingredients'});
const [ show, setShow ] = useState(false);
// const history = useHistory();
let navigate = useNavigate();

useEffect(() => {
	if (isSubmitSuccessful) {
		setShow(true);
		setTimeout(() => {
			setShow(false);
		}, 5000);
		reset();
		// navigate('/');
	}
}, [isSubmitSuccessful]);

const onSubmit = async (data) => {
	let url = `https://private-anon-c4fac2adb6-cookbook3.apiary-mock.com/api/v1/recipes`;
	let ingredientsArray = [];
	data?.ingredients.map((item) => item.ingredient && ingredientsArray.push(item.ingredient));
	let bodyData = {
		...data, ingredients: ingredientsArray
	};
	try {
		await fetch(url, {
			method: "POST",
			headers: {
			"Content-Type": "application/json",
			},
			body: JSON.stringify({
				bodyData
			})
		});
	} catch (error) {
		console.error(`Looks like we ain't ratin' tonight..`, error);
	}
};

// useEffect(() => {
// 	remove(0);
//   }, [remove])

return (
	<>
		<Header title="Přidat recept" addBtn={onSubmit}/>
			<div className='form-wrapper'>
				<Form className='create_recipe_form' onSubmit={handleSubmit(onSubmit)}>
					<Alert className='alert' isOpen={show} color="success">
						Mňam! Píšeme si...
					</Alert>
					<FormGroup floating className='input_set mt-70'>
						<input
							type="text"
							id="name"
							placeholder="Název receptu"
							title="Šamanský kebab po dábělsku"
							class="form-control"
							{...register('name', { validate: {
								emptyInput: value => (value && value.toString().length !== 0) || 'No name recepty jsou no-go'
							}})}
						/>
						<Label for="name">Název receptu</Label>
						{errors['name'] && <span className='input_error'>{errors['name'].message}</span>}
					</FormGroup>

					<FormGroup floating className='input_set mt-3'>
						<input
							type="text"
							id="description"
							title="Úvodní text"
							class="form-control"
							placeholder="Úvodní text"
							{...register('description', {required: true})}
						/>
						<Label for="description">Úvodní text</Label>
					</FormGroup>

					<h4 className='create_ingredients mt-3'>ingredience</h4>
					<FormGroup className='ingredients input_set'>
						{fields && fields.map((item, idx) => {
							return (
									<InputGroup key={item.id} className='ingredient_item'>
										<Controller
											render={({ field }) => <Input placeholder='Vaše ingredience' {...field} />}
											name={`ingredients.${idx}.ingredient`}
											control={control}
											defaultValue={item.ingredient}
										/>
										{/* < remove button was not part of solution pictures but it makes sense for me to have it
										<Button
											outline
											color="danger"
											size="sm"
											onClick={() => remove(idx)}
										>
											<span className="cil-minus" />
										</Button> */}
									</InputGroup>
								)
							})}
						<Button
							outline
							className='append_button mt-3'
							onClick={() => append({ingredient: ''})}
						>
							<span className="cil-plus pr-2" />Přidat
						</Button>
					</FormGroup>

					<FormGroup floating className='input_set mt-3'>
						<input
							type="text"
							id="info"
							className="form-control"
							title="Ani málo, ani moc, v tom je to umění"
							placeholder="Postup"
							{...register('info', {required: true})}
						/>
						<Label for="info">Postup</Label>
					</FormGroup>

					<FormGroup floating className='input_set mt-3'>
						<input
							type="number"
							id="duration"
							className='form-control'
							title="Čas"
							placeholder='Čas'
							{...register('duration', { required: true,
									max: {
										value: 1440,
										message: '3 000 000 let? Obyčejný poštovní průmer.'
									}, min: {
										value: 1,
										message: 'Bílá díra chrlí čas'
									}
								}
							)}
						/>
						<Label for="duration">Čas</Label>
						{errors['duration'] && <span className='input_error'>{errors['duration'].message}</span>}
					</FormGroup>

					<Button className='append_button mt-5' outline type="submit">
						<span className='cil-send pr-2'/>Uložit
					</Button>
				</Form>
			</div>
	</>
);
}

export default RecipeCreateContainer;
