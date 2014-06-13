class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.references :question
      t.string :answer
      t.boolean :is_correct

      t.timestamps
    end
  end
end
