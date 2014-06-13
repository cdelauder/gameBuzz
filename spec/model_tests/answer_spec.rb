require 'spec_helper'

describe Answer do
  it { should belong_to(:question) }
end

describe Answer do
  it { should have_db_column(:answer).of_type(:string) }
  it { should have_db_column(:is_correct).of_type(:boolean)}
end