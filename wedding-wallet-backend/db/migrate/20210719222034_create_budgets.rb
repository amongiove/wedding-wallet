class CreateBudgets < ActiveRecord::Migration[6.1]
  def change
    create_table :budgets do |t|
      t.decimal :amount
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
