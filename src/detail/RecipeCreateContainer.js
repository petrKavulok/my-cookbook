import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Form, FormGroup, Input, FormText, Button, InputGroup } from 'reactstrap';

const RecipeCreateContainer = () => {

const { register, handleSubmit, formState: { errors, isSubmitting, isDirty }, control, reset, setValue } = useForm();
const { replace, append, remove, fields } = useFieldArray({ control, name: 'ingredients'});

const onSubmit = (data) => {
	console.log(data); // You can perform further actions with the form data
};

useEffect(() => {
	remove(0);
  }, [remove])

return (
	<Form className='create_recipe_form' onSubmit={handleSubmit((data) => console.log('yooo: ', data))}>
		<div className='input_set mt-3'>
			<FormText>Název receptu</FormText>
			<Input
				type="text"
				id="recipe-title"
				title="Šamanský kebab po dábělsku"
				{...register('recipe-title', { validate: {
					emptyInput: value => (value && value.toString().length !== 0) || 'No name recepty jsou no-go'
				}})}
			/>
			{errors['recipe-title'] && <span className='input_error'>{errors['recipe-title'].message}</span>}
		</div>

		<div className='input_set mt-3'>
			<FormText>Úvodní text</FormText>
			<Input
				type="text"
				id="description"
				title="Úvodní text"
				{...register('description')}
			/>
		</div>
		<h4 className='create_ingredients mt-3'>ingredience</h4>
		<FormGroup className='ingredients'>
			<InputGroup>
				<Input
					id={'firstIngredient'}
					name={'firstIngredient'}
					type="text"
					placeholder='Vaše ingredience'
					{...register('firstIngredient')}
				/>
			</InputGroup>
			{fields && fields.map((item, idx) => {
				return (
						<InputGroup key={item.id} className='ingredient_item'>
							<Controller
								render={({ field }) => <Input placeholder='Vaše ingredience' {...field} />}
								name={`ingredients.${idx}.ingredient`}
								control={control}
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
				// size="sm"
				className='append_button mt-3'
				onClick={() => append({ingredient: ''})}
			>
				<span className="cil-plus" />Přidat
			</Button>
		</FormGroup>

		<div className='mt-3'>
			<Input
				type="text"
				id="how-to"
				title="Ani málo, ani moc, v tom je to umění"
				placeholder="Postup"
				{...register('how-to')}
			/>
		</div>
		<div className='input_set mt-3'>
			<Input
				type="number"
				id="duration"
				placeholder="Čas"
				// min={1}
				// max={1440}
				{...register('duration', { validate: {
					time: value => (value && (value > 0) && (value < 1440)) || 'Tomu nevěřím',
				}})}
			/>
			{console.log('errors: ', errors)}
			{errors['duration'] && <span className='input-error'>{errors['duration'].message}</span>}
		</div>

		<Button className='append-button mt-5' outline type="submit">Uložit</Button>
	</Form>
);
}

export default RecipeCreateContainer;
