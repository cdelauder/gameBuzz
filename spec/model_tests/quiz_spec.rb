require 'spec_helper'

describe Quiz do
  it { should have_many(:questions) }
end

describe Quiz do
  it { should have_db_column(:category).of_type(:string) }
end