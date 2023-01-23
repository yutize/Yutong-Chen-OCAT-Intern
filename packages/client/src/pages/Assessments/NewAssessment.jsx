/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API

  let sum = 0;
  // eslint-disable-next-line prefer-const
  let today = new Date().toISOString().slice(0, 10);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    sum = parseInt(data.dogs) + parseInt(data.hissing) +
    parseInt(data.owner) + parseInt(data.prevCont) + parseInt(data.pysAlt);
    console.log(sum);
    data.score = sum;

    if (sum === 0 || sum === 1)
    {
      data.riskLevel = `Low Risk`;
    }
    else if (sum === 2 || sum === 3)
    {
      data.riskLevel = `Medium Risk`;
    }
    else if (sum === 4 || sum === 5)
    {
      data.riskLevel = `High Risk`;
    }
    // data.date.toString();

    data.instrumentType = `Hello`;

    await AssessmentService.submit(data);
  };

  return <Form onSubmit={ handleSubmit(onSubmit) }>
    <div>
      <h1>Cat Behavioral Instrument</h1>
    </div>

    <div>
      <h2>Cat Details</h2>
    </div>

    <div className="form-control">
      <label>Cat Name </label>
      <input type="text" placeholder="Cat's name" name="catName" {...register(`catName`)} />
    </div>

    <div className="form-control">
      <label>Cat Date of Birth </label>
      <input type="date" name="catDate" {...register(`catDate`)} />
    </div>

    <div>
      <h2>Questions of Behavior</h2>
    </div>

    <div className="form-control">
      <label>Previous contact with Cat Judicial System </label>
      <select id="prevCont" name="prevCont" {...register(`prevCont`)}>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </select>
    </div>

    <div className="form-control">
      <label>Physical altercations with other cats </label>
      <select id="pysAlt" name="pysAlt" {...register(`pysAlt`)}>
        <option value={0}>0-3</option>
        <option value={1}>3+</option>
      </select>
    </div>

    <div className="form-control">
      <label>Physical altercations with owner </label>
      <select id="owner" name="owner" {...register(`owner`)}>
        <option value={0}>0-10</option>
        <option value={1}>10+</option>
      </select>
    </div>

    <div className="form-control">
      <label>Plays well with dogs </label>
      <select id="dogs" name="dogs" {...register(`dogs`)}>
        <option value={0}>Yes</option>
        <option value={1}>No</option>
      </select>
    </div>

    <div className="form-control">
      <label>Hissing with strangers </label>
      <select id="hissing" name="hissing" {...register(`hissing`)}>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </select>
    </div>
    <Button variant="primary" type="submit">Submit</Button>

  </Form>;
};
