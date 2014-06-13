# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

quiz = Quiz.create(category: "Dev Bootcamp Questions")

question1 = quiz.questions.create(question: "Who is your favorite teacher?")
question1.answers.create(answer: "Matt", is_correct: false)
question1.answers.create(answer: "Strand", is_correct: false)
question1.answers.create(answer: "Jeffrey", is_correct: false)
question1.answers.create(answer: "Derek", is_correct: true)

question2 = quiz.questions.create(question: "Is Javascript awesome?")
question2.answers.create(answer: "Yes", is_correct: true)
question2.answers.create(answer: "No", is_correct: false)
